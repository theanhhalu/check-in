const socket = io();


$(document).ready( () =>{
    const unitPosition= $("ul#memberUnitPosition li").each (() => $(this).text).get();
    const array= [];
    for(let i=0; i< unitPosition.length ; i++){
        array.push(unitPosition[i].innerHTML);
    };
    const data = {
        _mstt: $("#mstt").text(),
        _memberName: $("#memberName").text(),
        _unitPosition: array,
        _personalImage: $("#personalImage").attr('src'),
        yob: $("#yob").val(),
        gender: $("#gender").val(),
        folk: $("#folk").val(),
        religion: $("#religion").val(),
        qualification: $("#qualification").val(),
        qualificationLLCT: $("#qualificationLLCT").val(),
        partyMember: $("#partyMember").val(),
        groupNo: $("#groupNo").val()
    }
    const checkIn = () => {
        socket.emit("check-in", data);
    }
    window.addEventListener('load', checkIn);
});