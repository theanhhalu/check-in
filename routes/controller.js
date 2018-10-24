const Member = require ('./model/member');
const Unit = require('./model/unit');
const findAndUpdateMember = (mstt) => {
    return Member.findOneAndUpdate({_mstt:mstt, _present: false}, {$set: {_present:true}}, {new:true})
                .exec();
}

const findMember = (mstt) => {
    return Member.findOne({_mstt: mstt}).exec();
}


const getPresentMembers = () => {
    return Member.find({_present: true}).exec();
}

const getAllMembers = () =>{
    return Member.find({}).exec();
}
const updateAll = () =>{
    return Member.updateMany({}, {$set: {_present: false}}).exec();
}
const updatePresentUnit = () =>{
    return Unit.updateMany ({}, {$set: {_presentMember: 0}}).exec();
}
exports.authMember = async (req, res, next) => {
    
    try {
        const member = await findMember(req.params.mstt);
        if(member){
            next();
        }
        else res.send("MÃ ĐẠI BIỂU KHÔNG HỢP LỆ");
    } catch (error) {
        next(error);
    }  
}
const findGroup = (num) => {
    return Unit.findOne({groupNo: num}).exec();
}
const getAllGroup = () =>{
    return Unit.find({}).exec();
}
const increasePresent = async (num) =>{
    try {
        const unit = await findGroup(num);
        const presentMember = unit._presentMember + 1;
        return Unit.findOneAndUpdate({groupNo: num} , {$set: {_presentMember: presentMember}}, {new:true})
                    .exec();
    } catch (error) {
        return error;
    }
} 
exports.checkInMember = async (req, res, next) => {
    try {
        const member = await findAndUpdateMember(req.params.mstt);
        if(member){
            const unit = await increasePresent(member.groupNo);
            console.log(unit);
            if(unit){
                res.render('checkin', {title: "Điểm danh", data: member});
            }
            else{
                res.send("Update unit._presentMember failed!");
            }
        }
        else{
            res.redirect('/checked');
        }
        
    } catch (error) {
        next(error);
    }
}

exports.getToIndex = async (req, res, next) => {
    try {
        const units = await getAllGroup();
        let totalPresent = 0;
        let unitPresent = [];
        for(let unit of units){
            let quantity = unit._presentMember;
            // unitPresent.push(quantity);
            totalPresent += quantity;
        }
        res.render('index', {title:'Danh sách đại biểu có mặt', units: units, total: totalPresent});
    } catch (error) {
        next(error);
    }
}

exports.getToChecked = (req, res) =>{
    res.render('checked', {title: "Checked"});
}

exports.resetAll = async (req, res, next) =>{
    try {
        if(req.body.password === "daihoi3"){
            const result1 = await updateAll();
            const result2 = await updatePresentUnit();
            if(result1.ok && result2.ok){
                res.send('RESET ALL COMPLETED!');
            }
            else{
                res.send('Reset all failed!');
            }
        }
        else{
            res.send("Wrong Password!");
        }
  
    } catch (error) {
        next(error);
    }
}
exports.getReset = (req, res, next) =>{
    res.render("reset");
}

exports.getListMembers = async (req, res, next) => {
    try {
        const listMembers = await getAllMembers();
        
        if(listMembers.length > 0){
            let total = 0;
            listMembers.forEach((member) =>{
                if(member._present){
                    total++;
                }
            });
            res.render("list", {data: listMembers, totalPresent: total});
        }
        else{
            res.send("Database is Null!")
        }
    } catch (error) {
        next(error);
    }
}

