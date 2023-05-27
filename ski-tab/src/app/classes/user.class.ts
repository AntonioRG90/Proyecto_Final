export class User {
  private email: string;
  private isActive: boolean;
  private role: boolean;

  constructor(email: string, isActive: boolean, role: boolean) {
    this.email = email;
    this.isActive = isActive;
    this.role = role;
  }

  getEmail(): string {
    return this.email;
  }

  getIsActive(): boolean {
    return this.isActive;
  }

  getRole(): boolean {
    return this.role;
  }

}