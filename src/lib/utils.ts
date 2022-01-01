export type Bubble = {
  person?: string;
  type?: string;
  message: string;
}

export function parser(text: string): Bubble[] {
  const textList = text.split('」');
  const sentenceList = [];

  textList.forEach(sentence => {
    if (!sentence || !sentence.length) {
      return;
    }

    if (sentence.includes('曰')) {
      // 1:10 子禽問於子貢 -> 子禽
      const pickOutPerson = (str: string) => {
        let personOrNot = sentence.split('曰：「')[0];

        if (personOrNot.includes('。')) {
          const description = personOrNot.split('。')[0];
          sentenceList.push({
            type: 'center',
            message: description,
          })
          personOrNot = personOrNot.split('。')[1];
        }

        if (str.includes('問')) {
          return sentence.split('問')[0];
        }

        return sentence.split('曰：「')[0];
      }

      const person = pickOutPerson(sentence);
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
