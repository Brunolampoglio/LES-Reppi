import { TermsOfUse } from "../entities/TermsOfUse";

interface ITermsOfUseRepository {
  find(): Promise<TermsOfUse | undefined>;
  create(description: string): Promise<TermsOfUse>;
  save(data: TermsOfUse): Promise<TermsOfUse>;
  remove(data: TermsOfUse): Promise<void>;
}

export { ITermsOfUseRepository };
