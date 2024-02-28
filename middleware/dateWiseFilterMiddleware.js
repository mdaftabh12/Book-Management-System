//=====================  Date wise filter  =====================//

exports.dateWiseFilter = async (req, res, next) => {
  try {
    let { date } = req.body;
    if (date) {
      let obj3 = {};

      if (date == "year") {

        //=====================  Get year  =====================//

        obj3 = {
          createdAt: {
            $gte: new Date(
              new Date().getFullYear(),
              new Date().getMonth() - new Date().getMonth(),
              new Date().getDate() + 1 - new Date().getDate()
            ),
            $lte: new Date(),
          },
        };
      } else if (date == "month") {

        //=====================  Get month  =====================//

        obj3 = {
          createdAt: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth()),
            $lte: new Date(),
          },
        };
      } else if (date == "week") {

        //=====================  Get week  =====================//

        let week = Math.floor(new Date().getDate() / 7) * 7 - 1;
        obj3 = {
          createdAt: {
            $gte: new Date().setDate(week),
            $lte: new Date().getTime(),
          },
        };
      } else {

        //=====================  Get today  =====================//

        obj3 = {
          createdAt: {
            $gte: new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate()
            ),
            $lte: new Date(),
          },
        };
        console.log(obj3);
      }
      req.date = obj3;
      next();
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
