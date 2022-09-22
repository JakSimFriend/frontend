export const serverResponseStatusCode = {
  1000: "요청에 성공하였습니다.",
  2001: "JWT를 입력해주세요.",
  2002: "유효하지 않은 JWT입니다.",
  2003: "권한이 없는 유저의 접근입니다.",
  2004: "ACCESS TOKEN을 입력하세요.",
  2005: "DEVICE TOKEN을 입력하세요.",
  2010: "JWT를 입력해주세요",
  2011: "jWT가 변조되었거나 만료시간이 지났습니다. 다시 확인해 주세요.",
  2012: "권한이 없는 유저의 접근입니다.",
  2019: "닉네임을 입력해주세요.",
  2020: "닉네임 형식을 확인해주세요.",
  2021: "추천인을 확인해주세요.",
  2022: "생일을 입력해주세요.",
  2100: "챌린지 제목을 입력해주세요.",
  2101: "챌린지 제목 형식을 입력해주세요.",
  2102: "챌린지 내용을 입력해주세요.",
  2103: "챌린지 내용 형식을 확인해주세요.",
  2104: "챌린지 시작 날짜를 입력해주세요.",
  2106: "챌린지 인증 주기를 입력해주세요.",
  2107: "챌린지 인증 주기 형식을 확인해주세요.",
  2108: "챌린지 인증 횟수를 입력해주세요.",
  2109: "챌린지 인증 횟수 형식을 확인해주세요.",
  2110: "챌린지 인증 시간을 입력해주세요.",
  2112: "챌린지 카테고리를 입력해주세요.",
  2113: "챌린지 카테고리 형식을 확인해주세요.",
  2114: "사용자를 입력해주세요.",
  2115: "태그 형식을 확인해주세요.",
  2200: "작심 다짐하기를 입력해주세요.",
  2201: "작심 다짐하기 형식을 확인해주세요.",
  2203: "검색어 형식을 확인해주세요.",
  2204: "사용자 인덱스를 입력해주세요.",
  2205: "챌린지 인덱스를 입력해주세요.",
  2206: "포인트를 입력해주세요.",
  2207: "경험치를 입력해주세요.",
  2208: "달성률을 입력해주세요.",
  2209: "포인트를 확인해주세요.",
  2210: "경험치를 확인해주세요.",
  2211: "달성률을 확인해주세요.",
  2215: "문의 제목을 입력해주세요.",
  2216: "문의 내용을 입력해주세요.",
  2217: "문의 제목 형식을 확인해주세요.",
  2218: "문의 내용 형식을 확인해주세요.",
  3005: "로그아웃된 상태입니다.",
  3015: "중복된 닉네임입니다.",
  3016: "존재하지 않는 유저입니다.",
  3017: "닉네임 설정에 실패하였습니다.",
  3018: "추천인 등록에 실패하였습니다.",
  3019: "챌린지가 존재하지 않습니다.",
  3020: "작심 다짐하기 설정에 실패하였습니다.",
  3021: "존재하지 않는 챌린지 입니다.",
  3022: "추천 챌린지가 존재하지 않습니다.",
  3023: "챌린지 가입에 실패하였습니다.",
  3024: "이미 가입 신청이 되어있습니다.",
  3025: "가입 신청이 존재하지 않습니다.",
  3026: "이미 거절하였습니다.",
  3027: "이미 수락하였습니다.",
  3028: "챌린지를 개설한 사용자가 아닙니다.",
  3030: "챌린지 정보가 존재하지 않습니다.",
  3031: "프로필 사진 수정에 실패하였습니다.",
  3033: "챌린지 멤버가 아닙니다.",
  3034: "오늘은 이미 인증하였습니다.",
  3035: "오늘의 인증 마감시간이 지났습니다.",
  3036: "진행 중인 챌린지는 삭제할 수 없습니다.",
  3037: "포인트가 부족합니다.",
  3038: "마감된 챌린지입니다.",
  3039: "진행 중인 챌린지는 신청할 수 없습니다.",
  3040: "생일 등록에 실패하였습니다.",
  3041: "존재하지 않는 알림입니다.",
  3042: "알림이 존재하지 않습니다.",
  3043: "접근이 불가능한 사용자입니다.",
  3044: "이미 설정이 되어있습니다.",
  3045: "이미 해제가 되어있습니다.",
  3046: "이미 보상을 받았습니다.",
  3047: "종료된 챌린지가 아닙니다.",
  3048: "보상받기에 실패하였습니다.",
  3049: "현황 정보가 존재하지 않습니다.",
  3050: "DEVICE TOKEN이 존재하지 않습니다.",
  3051: "존재하지 않는 인증입니다.",
  3052: "이미 신고하셨습니다.",
  4000: "데이터베이스 연결에 실패하였습니다.",
  4012: "프로필 조회에 실패하였습니다.",
  4015: "챌린지 삭제 실패",
  4016: "가입 신청 취소 실패",
  4017: "가입 거절 실패",
  4018: "가입 수락 실패",
  4019: "챌린지 인증에 실패하였습니다.",
  4020: "탈퇴에 실패하였습니다.",
  4021: "알림 삭제에 실패하였습니다.",
  4025: "알림 해제에 실패하였습니다.",
  4026: "DEVICE TOKEN 저장에 실패하였습니다.",
  4027: "로그아웃에 실패하였습니다.",
  4028: "신고하기에 실패하였습니다.",
  5001: "잘못된 URL 정보입니다.",
  5002: "URL 연결에 실패했습니다.",
  5003: "로그인 정보 조회에 실패했습니다.",
  5004: "파싱에 실패했습니다.",
};

export interface BaseResponse {
  isSuccess: boolean;
  code: number;
  message: string;
}
