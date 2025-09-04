export const generateOTPWithChar = (): string => {
  const digits = Math.floor(100 + Math.random() * 900).toString();
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const position = Math.floor(Math.random() * 4);
  return digits.slice(0, position) + letter + digits.slice(position);
};

export const generateOTP = (): string => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};


export const generateUniqueStudentId = async (
  checkExistence: (id: string) => Promise<boolean>,
): Promise<string> => {
  const year = new Date().getFullYear();
  const maxAttempts = 100;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const randomNum = Math.floor(100000 + Math.random() * 900000).toString();
    const studentId = `${year}${randomNum}`;
    const exists = await checkExistence(studentId);
    if (!exists) {
      return studentId;
    }
  }
  throw new Error(
    'Unable to generate unique student ID after maximum attempts',
  );
};

export const generateSequentialStudentId = async (
  getLastStudentId: () => Promise<string | null>,
): Promise<string> => {
  const year = new Date().getFullYear();
  const yearStr = year.toString();
  try {
    const lastStudentId = await getLastStudentId();
    if (!lastStudentId || !lastStudentId.startsWith(yearStr)) {
      return `${year}100001`;
    }
    const lastSequence = parseInt(lastStudentId.substring(4));
    const nextSequence = lastSequence + 1;
    const paddedSequence = nextSequence.toString().padStart(6, '0');
    return `${year}${paddedSequence}`;
  } catch (error) {
    return `${year}100001`;
  }
};

export const generateHybridStudentId = async (
  checkExistence: (id: string) => Promise<boolean>,
  getLastStudentId: () => Promise<string | null>,
): Promise<string> => {
  const year = new Date().getFullYear();
  const yearStr = year.toString();

  try {
    const lastStudentId = await getLastStudentId();
    let baseNumber = 100001;

    if (lastStudentId && lastStudentId.startsWith(yearStr)) {
      const lastSequence = parseInt(lastStudentId.substring(4));
      baseNumber = lastSequence + 1;
    }
    const randomOffset = Math.floor(Math.random() * 10);
    const candidateNumber = baseNumber + randomOffset;
    const paddedNumber = candidateNumber.toString().padStart(6, '0');
    const studentId = `${year}${paddedNumber}`;

    const exists = await checkExistence(studentId);
    if (!exists) {
      return studentId;
    }
    const fallbackId = `${year}${baseNumber.toString().padStart(6, '0')}`;
    const fallbackExists = await checkExistence(fallbackId);
    if (!fallbackExists) {
      return fallbackId;
    }
    let nextNumber = baseNumber + 1;
    while (
      await checkExistence(`${year}${nextNumber.toString().padStart(6, '0')}`)
    ) {
      nextNumber++;
      if (nextNumber > 999999) {
        throw new Error('Student ID range exhausted for this year');
      }
    }
    return `${year}${nextNumber.toString().padStart(6, '0')}`;
  } catch (error) {
    throw new Error(`Failed to generate student ID: ${error}`);
  }
};
