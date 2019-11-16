class Helpers {
  
  isValidId = id => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) return true;
    return false;
  };
}

const helpers = new Helpers();

export default helpers;
