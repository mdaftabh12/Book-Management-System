exports.setTimeOutFun = async (req, res) => {
  try {
    let myTimeout; 
    let i = 1;
    if (myTimeout) {
      clearTimeout(myTimeout);
    }
    function fun() {
      if (i <= 5) {
        myTimeout = setTimeout(() => {
          console.log(`${i}`);
          i++;
          fun();
        }, 1000);
      }
    } 
    fun();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
