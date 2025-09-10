export class Honeypot {
  static validate(honeypotValue: string | undefined): boolean {
    // Honeypot should be empty - if filled, it's a bot
    return honeypotValue === '' || honeypotValue === undefined || honeypotValue === null;
  }

  static generateFieldName(): string {
    // Generate a convincing field name that bots might fill
    const names = ['website', 'company', 'phone', 'fax', 'url'];
    return names[Math.floor(Math.random() * names.length)];
  }
}