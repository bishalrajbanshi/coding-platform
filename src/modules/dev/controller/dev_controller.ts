import { Request, Response } from "express";
import { codeServices } from "../services/dev_services";

export const runCode = async (req: Request, res: Response) => {
  const { code, language } = req.body;
  try {
    const codeSnapit = await codeServices.SolveCode(code, language);
    res.json({ success: true, result: codeSnapit });
  } catch (err: any) {
    res.json({ success: false, error: err.message });
  }
};
