export default trial => ({
  orelse: async backup => {
    try {
      return await trial();
    } catch (error) {
      return backup(error);
    }
  },
});
