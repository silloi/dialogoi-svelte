export function parser(text: string): any[] {
  const textList = text.split('」');
  const sentenceList = [];

  textList.forEach(sentence => {
    if (!sentence || !sentence.length) {
      return;
    }

    if (sentence.includes('曰')) {
      const person = sentence.split('曰：「')[0];
      const type = sentence.includes('子曰') ? 'left' : 'right';
      const message = sentence.split('曰：「')[1];

      sentenceList.push({
        person,
        type,
        message,
      });
    }
  });

  return sentenceList;
};
