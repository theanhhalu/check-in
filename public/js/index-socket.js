const socket = io();
// var members = JSON.parse(window.localStorage.getItem("data"));
var members = [];

socket.on("add-to-present-members", (data) => {
  members.push(data);
  window.localStorage.setItem("data", JSON.stringify(members));
});

const infoMember = $("#checkInMember");
const fadeInDown = () => {
  infoMember.removeClass("fade-out");
  infoMember.addClass("fade-in");
}

const fadeOutEffect = () => {
  infoMember.removeClass("fade-in");
  infoMember.addClass("fade-out");
}

const getData = () => {
    var member = members[0];
    return member;
}

const fillData = (data) => {
  
  const infoContent = $("#info-member");
  const groupNo = $(`#_g${data.groupNo}`);
  // console.log(groupNo.text());
  const total = $("#total");
  const unitPosition = data._unitPosition
    .map(item => {
      return `<li><i class="fas fa-plus"></i>${item}</li>`;
    })
    .join("");
  let temp = parseInt(groupNo.text()) + 1;
  groupNo.text(temp);
  let totalTemp = parseInt(total.text()) + 1;
  total.text(totalTemp);
  infoContent.html(`<div class="left">               
  <h3 class="left-title">Đại biểu</h3>
<img src="${data._personalImage}" alt="" id="personalImage" width="240px" height="320px">
<h3 id="name-member">${data._memberName}</h3>
</div>

<div class="right">
<h3 class="info-title">Thông tin đại biểu</h3>
<div class="info">

      <div class="item-info">
              <p class="title"><i class="fas fa-minus"></i>Năm sinh:</p>
              <p id="yob" class="item-value">${data.yob}</p>
      </div>
      <div class="item-info">
              <p class="title"><i class="fas fa-minus"></i>Giới tính:</p>
              <p id="gender" class="item-value">${data.gender}</p>
      </div>
      <div class="item-info"></div>
          <p class="title"><i class="fas fa-minus"></i>Chức vụ, đơn vị:</p>
          <ul id="unitPosition" class="item-value">
              ${unitPosition}
          </ul>
      
      <div class="item-info">
              <p class="title"><i class="fas fa-minus"></i>Dân tộc:</p>
              <p id="folk" class="item-value">${data.folk}</p>
      </div>
      <div class="item-info">
              <p class="title"><i class="fas fa-minus"></i>Tôn giáo:</p>
              <p id="religion" class="item-value">${data.religion}</p>
      </div>
      <div class="item-info">
              <p class="title"><i class="fas fa-minus"></i>Trình độ:</p>
              <p id="qualification" class="item-value">${data.qualification}</p>
      </div>
      <div class="item-info">
              <p class="title"><i class="fas fa-minus"></i>Trình độ LLCT:</p>
              <p id="qualificationLLCT" class="item-value">${data.qualificationLLCT}</p>
      </div>
      <div class="item-info">
              <p class="title"><i class="fas fa-minus"></i>Đảng/Đoàn:</p>
              <p id="partyMember" class="item-value">${data.partyMember}</p>
      </div>
</div>
</div>`);
};


$(document).ready(() => {
  
  setInterval(() => {
    if(!infoMember.hasClass("fade-in")){
      if(members.length > 0 ){
        const member = members[0];
        members.shift();
        localStorage.setItem("data",JSON.stringify(members));
        fillData(member);
        fadeInDown();
        setTimeout(fadeOutEffect,7000);
      }
        
    }
  }, 1000); 
});
