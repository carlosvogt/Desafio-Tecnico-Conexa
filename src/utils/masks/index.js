const masks = {
  date: (value) => {
    const document = value.replace(/\D/g, '');
    return document
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1/$2');
  },
  hour: (value) => {
    const document = value.replace(/\D/g, '');
    return document.replace(/(\d{2})(\d)/, '$1:$2');
  },
};

export default masks;
