module.exports = {
  setProviders: function(providers) {
      localStorage.setItem('providers', JSON.stringify(providers));
      return providers;
  },

  getProviders: function () {
    var stringProviders = localStorage.getItem('providers');
    var providers = {};

    try {
      providers = JSON.parse(stringProviders);
      console.log(providers);
    } catch (error) {
      console.log(error);
    }
    return providers ? providers : {}
  }
};
