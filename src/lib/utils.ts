export function parser(text: string): any[] {
  const textList = text.split('」');

  return textList.map(sentence => {
    if (!sentence.length) {
      return;
    }

    if (sentence.includes('曰')) {
      const person = sentence.split('曰：「')[0];
      const type = sentence.includes('子曰') ? 'left' : 'right';
      const message = sentence.split('曰：「')[1];

      return {
        person,
        type,
        message,
      };
    }
  });
};