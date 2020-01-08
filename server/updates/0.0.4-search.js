const keystone = global.keystone;
const Publication = keystone.list('Publication').model;

module.exports = async (done) => {
  
    await Publication.updateMany({enabled: true}, {indexed: true});
    
    done();

};