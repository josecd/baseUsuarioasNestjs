import { HttpException, HttpStatus } from "@nestjs/common";
export class ErrorManager extends Error {
  constructor({
    type,
    message
  }: {
    type: keyof typeof HttpStatus;
    message: string;
  }) {
    super(`${type} :: ${message}`);
  }

  public static createSignatureError(mesasage: string) {
    const name = mesasage.split(" :: ")[0];
    if (name) {
      throw new HttpException(mesasage, HttpStatus[name]);
    } else {
      throw new HttpException(mesasage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
