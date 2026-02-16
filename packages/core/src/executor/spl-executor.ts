import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  Keypair,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import { createTransferCheckedInstruction, getAccount } from '@solana/spl-token';
import { SplTransferRequest, ExecutionResult, ExecutorConfig } from './types';
import { TransactionSimulator } from './simulator';

/**
 * SplTransferExecutor: Handles SPL token transfers with validation and simulation
 * Flow: validation → simulate → execute
 */
export class SplTransferExecutor {
  private connection: Connection;
  private simulator: TransactionSimulator;

  constructor(config: ExecutorConfig) {
    this.connection = new Connection(config.rpcUrl, config.commitment || 'confirmed');
    this.simulator = new TransactionSimulator(config);
  }

  /**
   * Validate SPL transfer parameters
   */
  private async validateTransfer(request: SplTransferRequest): Promise<{
    valid: boolean;
    error?: string;
  }> {
    try {
      // Check sender token account exists
      const senderAccount = await getAccount(this.connection, request.senderTokenAccount);
      if (!senderAccount) {
        return { valid: false, error: 'Sender token account not found' };
      }

      // Check recipient token account exists
      const recipientAccount = await getAccount(this.connection, request.recipientTokenAccount);
      if (!recipientAccount) {
        return { valid: false, error: 'Recipient token account not found' };
      }

      // Check sender has sufficient balance
      if (senderAccount.amount < BigInt(request.amount)) {
        return { valid: false, error: 'Insufficient balance' };
      }

      // Check mints match
      if (senderAccount.mint.toString() !== recipientAccount.mint.toString()) {
        return { valid: false, error: 'Token mints do not match' };
      }

      return { valid: true };
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : 'Validation failed',
      };
    }
  }

  /**
   * Create SPL transfer transaction
   */
  private async createTransferTransaction(
    request: SplTransferRequest,
    payer: PublicKey
  ): Promise<Transaction> {
    const senderAccount = await getAccount(this.connection, request.senderTokenAccount);
    const decimals = request.decimals || senderAccount.decimals;

    const instruction = createTransferCheckedInstruction(
      request.senderTokenAccount,
      senderAccount.mint,
      request.recipientTokenAccount,
      senderAccount.owner,
      request.amount,
      decimals
    );

    const transaction = new Transaction().add(instruction);
    const { blockhash } = await this.connection.getLatestBlockhash('confirmed');
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = payer;

    return transaction;
  }

  /**
   * Execute SPL transfer: validate → simulate → execute
   */
  async execute(
    request: SplTransferRequest,
    payer: Keypair,
    config: { skipSimulation?: boolean } = {}
  ): Promise<ExecutionResult> {
    const startTime = Date.now();

    try {
      // Step 1: Validate
      const validation = await this.validateTransfer(request);
      if (!validation.valid) {
        return {
          success: false,
          error: validation.error,
          timestamp: startTime,
        };
      }

      // Step 2: Create transaction
      const transaction = await this.createTransferTransaction(request, payer.publicKey);
      transaction.sign(payer);

      // Step 3: Simulate (unless skipped)
      if (!config.skipSimulation) {
        const simulationResult = await this.simulator.simulate(transaction as any, [payer]);

        if (!simulationResult.success) {
          return {
            success: false,
            error: this.simulator.extractErrorMessage(simulationResult.logs),
            simulationResult,
            timestamp: startTime,
          };
        }
      }

      // Step 4: Execute
      const signature = await sendAndConfirmTransaction(this.connection, transaction, [payer]);

      return {
        success: true,
        signature,
        timestamp: startTime,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: startTime,
      };
    }
  }
}
