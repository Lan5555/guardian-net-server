export type NetResponse<T = unknown> = {
  success: boolean;
  message: string;
  data: T | null;
};

export type Future<T> = Promise<T>;

export class ResponseHelper {
  public static success<T>(message: string, data?: T): NetResponse<T> {
    return {
      success: true,
      message,
      data: data ?? null,
    };
  }

  public static error<T>(message: string, data?: T): NetResponse<T> {
    return {
      success: false,
      message,
      data: data ?? null,
    };
  }

  public static fromError(error: unknown): NetResponse {
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return {
      success: false,
      message,
      data: null,
    };
  }
}
