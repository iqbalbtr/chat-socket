const { schedule } = require("node-cron");
const prisma = require("../../prisma/prisma");

const statusScheduler = schedule('*/5 * * * *', async() => {
    
    /**
     * 
     * Deleting status user if less than now
     */
    await prisma.user_status.deleteMany({
        where: {
            create_at: {
                lte: new Date()
            },
            status_read: true
        }
    })

});

function initilaizeScheduler(){
    

    /**
     * 
     * Iniitalize all sheduller 
     */

    statusScheduler.start()
    
    console.log("Scheduler status is active")
}

module.exports = {
    initilaizeScheduler
}


