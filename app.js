global.test = function(){
    var rkey = document.getElementById("rkey").value;
    var amount = document.getElementById("amount").value/8;
    //var name = document.getElementById("name").value;
    //console.log(name + " " + email + " " + rkey + " " + amount);
    const { transfer } = require('@waves/waves-transactions')
    const seed = 'hurt random session nerve garment rare what family dizzy gentle youth smooth coin acoustic indoor'
    const signedTx = transfer({
    amount: amount*8,
      recipient: rkey,
    }, seed)
     const {broadcast} =  require('@waves/waves-transactions');
   const nodeUrl = 'https://testnodes.wavesnodes.com';
   
   broadcast(signedTx, nodeUrl).then(resp => console.log(resp))
    }
 
