const MEMBER_CSS_FILE_PATH = '/resources/css/member.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = MEMBER_CSS_FILE_PATH;
document.head.appendChild(linkEle);

document.addEventListener("DOMContentLoaded", (event) => {
	let ranText = document.querySelector(".login-wrap .right-con h3");
	if(ranText != null){
		let num = Math.floor(Math.random() * 10);
		let str = "";
		switch (num) {
			case 0: str = "어디에도 없던 그 맛, 바삭바삭 김말이 튀김, 지금 바로 만나보세요!"; break;
			case 1:	str = "매콤달콤 떡꼬치, 오늘 당신의 스트레스를 날려줄 맛!"; break;
			case 2: str = "추운 날씨, 당신의 손을 녹여줄 꿀 떨어지는 호떡은 어디에?"; break;
			case 3: str = "뜨끈한 국물이 생각날 땐, 어서 와! 여기 맛있는 어묵꼬치가 있어!"; break;
			case 4:	str = "톡톡 터지는 즐거움, 향긋한 군밤 찾아 삼만리? 바로 여기 있어요!"; break;
			case 5: str = "부드러운 단팥 찐빵, 온종일 당신을 따뜻하게 안아줄 거예요."; break;
			case 6: str = "쫀득한 식감에 달콤함까지! 찹쌀떡, 어디서든 널 기다려!"; break;
			case 7: str = "달콤한 향기에 이끌려 도착한 곳, 바로 여기 군고구마가 활활!"; break;
			case 8: str = "상큼함이 필요할 땐? 고민 말고 제주 감귤을 찾아오세요!"; break;
			case 9: str = "아침을 깨우는 포근함, 촉촉한 계란빵이 당신 곁에!"; break;
		}
		ranText.innerHTML = str;
	}
})
