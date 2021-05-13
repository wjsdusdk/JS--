// https://heropy.blog/2018/10/28/regexp/

// 정규표현식 with JavaScript

/* const str0 = 'hello 
world' // ''는 줄바꿈하면 err */

const str0 = `hello 
world`; // ``는 줄바꿈 가능

const str = `
010-1234-5678
thesecon@gmail.com
https://www.omdbapi.com/?apikey=7035c60c&s=frozen
The quick brown fox jumps over the lazy dog.
abbcccdddd
`;

/* 1. 자바스크립트 정규식 생성과 플래그 (옵션) */

// 생성자 함수 방식

const regexp1 = new RegExp("the", "");
console.log(str.match(regexp1));
// ["the", index: 15, input: "↵010-1234-5678↵thesecon@gmail.com↵https://www.omdb…ck brown fox jumps over the lazy dog.↵abbcccdddd↵", groups: undefined]
// 0: "the"

// g: 일치하는 모든 내용
const regexp2 = new RegExp("the", "g");
console.log(str.match(regexp2));
// (2) ["the", "the"]
// 0: "the" 1: "the"

// i: 대소문자 구분 X
const regexp3 = new RegExp("the", "gi");
console.log(str.match(regexp3));
// (3) ["the", "The", "the"]
// 0: "the" 1: "The" 2: "the"

// 리터럴(Literal) 방식

const regexp4 = /the/;
console.log(str.match(regexp4));
// ["the", index: 15, input: "↵010-1234-5678↵thesecon@gmail.com↵https://www.omdb…ck brown fox jumps over the lazy dog.↵abbcccdddd↵", groups: undefined]
// 0: "the"

// g: 일치하는 모든 내용
const regexp5 = new RegExp("the", "g");
console.log(str.match(regexp5));
// (2) ["the", "the"]
// 0: "the" 1: "the"

// i: 대소문자 구분 X
const regexp6 = /the/gi;
console.log(str.match(regexp6));
// (3) ["the", "The", "the"]
// 0: "the" 1: "The" 2: "the"

// .: 특정한 문자를 검색하는 패턴
// \: 정규표현식으로 해석되는 문자를 단순한 문자로 해석되게 함
const regexp7 = /\./gi;
console.log(str.match(regexp7)); // (4) [".", ".", ".", "."]

// $: 문자 데이터의 끝에 .가 있는지 일치시킴
const regexp8 = /\.$/gi;
console.log(str.match(regexp8)); // null

// m : 여러 줄 일치
const regexp9 = /\.$/gim;
console.log(str.match(regexp9)); // ["."]

/* 2. 자바스크립트 메소드 */

// 정규식.test(문자열) : 일치 여부(Boolean) 반환

const test1 = /fox/gi;
const test2 = /HEROPY/gi;

console.log(test1.test(str)); // true
console.log(test2.test(str)); // false

// 문자열.match(정규식) : 일치하는 문자열의 배열(Array) 반환

const match1 = /the/gi;
console.log(str.match(match1));
// (3) ["the", "The", "the"]

// 문자열.replace(정규식,대체문자) : 일치하는 문자열을 대체하고 대체된 문자열(String) 반환

const replace1 = /fox/gi;

// 원본 데이터 손상 X (재할당이 불가능한 const로 변수 선언)

console.log(str.replace(replace1, "AAA"));
/* 010-1234-5678
thesecon@gmail.com
https://www.omdbapi.com/?apikey=7035c60c&s=frozen
The quick brown AAA jumps over the lazy dog.
abbcccdddd */
console.log(str);
/* 010-1234-5678
thesecon@gmail.com
https://www.omdbapi.com/?apikey=7035c60c&s=frozen
The quick brown fox jumps over the lazy dog.
abbcccdddd */

// 원본 데이터 수정됨 (재할당이 가능한 let으로 변수 선언)

let str2 = `
010-1234-5678
thesecon@gmail.com
https://www.omdbapi.com/?apikey=7035c60c&s=frozen
The quick brown fox jumps over the lazy dog.
abbcccdddd
`;

str2 = str2.replace(replace1, "AAA");

console.log(str2);
/* 010-1234-5678
thesecon@gmail.com
https://www.omdbapi.com/?apikey=7035c60c&s=frozen
The quick brown fox jumps over the lazy dog.
abbcccdddd */

/* 3. 패턴 (표현) */

// ab$ : 줄(Line) 끝에 있는 ab와 일치
console.log(str.match(/d$/g)); // null
console.log(str.match(/d$/gm)); // ["d"]

// ^ab : 줄(Line) 시작에 있는 ab와 일치
console.log(str.match(/^t/gm)); // ["t"]
console.log(str.match(/^t/gim)); // (2) ["t", "T"]

// . : 임의의 한 문자와 일치
console.log(str.match(/h..p/g)); // ["http"]

// a|b : a 또는 b와 일치
console.log(str.match(/fox|dog/g)); // (2) ["fox", "dog"]
console.log(str.match(/fox|dog/)); // ["fox", ...]
console.log(str.match(/dog|fox/)); // ["fox", ...]

// ab? : b가 없거나 b와 일치 (b가 있을수도 있고 없을수도 있고)
console.log(str.match(/thes/g)); // ["thes"]
console.log(str.match(/thes?/g)); // (2) ["thes", "the"]

// {3} | 3개 연속 일치
console.log(str.match(/d{2}/)); // ["dd", ...]
console.log(str.match(/d{2}/g)); // (2) ["dd", "dd"]

// {3,} | 3개 이상 연속 일치
console.log(str.match(/d{2,}/g)); // ["dddd"]

// {3,5} | 3개 이상 5개 이하(3~5개) 연속 일치
console.log(str.match(/d{2,3}/g)); // ["ddd"]

// [abc] | a 또는 b 또는 c
console.log(str.match(/[fox]/g)); // (12) ["o", "o", "o", "o", "f", "o", "o", "f", "o", "x", "o", "o"]

// [a-z] | a부터 z 사이의 문자 구간에 일치 (영어 소문자)

// [A-Z] | A부터 Z 사이의 문자 구간에 일치 (영어 대문자)

// [0-9] | 0부터 9 사이의 문자 구간에 일치 (숫자)
console.log(str.match(/[0-9]/g)); // (17) ["0", "1", "0", "1", "2", "3", "4", "5", "6", "7", "8", "7", "0", "3", "5", "6", "0"]
console.log(str.match(/[0-9]{1,}/g)); // (5) ["010", "1234", "5678", "7035", "60"]

// [가-힣] | 가부터 힣 사이의 문자 구간에 일치 (한글)
const str3 = `동해물과 백두산이 마르고 닳도록`
console.log(str3.match(/[가-힣]/g)); // (14) ["동", "해", "물", "과", "백", "두", "산", "이", "마", "르", "고", "닳", "도", "록"]
console.log(str3.match(/[가-힣]{1,}/g)); // (4) ["동해물과", "백두산이", "마르고", "닳도록"]

// \w : 63개 문자(Word, 대소영문 52개 + 숫자 10개 + _)에 일치
console.log(str.match(/\w{2,3}/g)); // (37) ["010", "123", "567", "the", "sec", ...] 

// \b : 63개 문자에 일치하지 않는 문자 경계(Boundary)
console.log(str.match(/\b\w{2,3}\b/g)); // (8) ["010", "com", "www", "com", "The", "fox", "the", "dog"]
console.log(str.match(/\bf\w{1,}\b/g)); // (2) ["frozen", "fox"]   // 소문자 f로 시작하는 모든 영단어

// /d | 숫자(Digit)에 일치
console.log(str.match(/\d/g)); // (17) ["0", "1", "0", "1", "2", "3", "4", "5", "6", "7", "8", "7", "0", "3", "5", "6", "0"]
console.log(str.match(/\d{1,}/g)); // (5) ["010", "1234", "5678", "7035", "60"]

// /s | 공백(Space, Tab 등)에 일치
const h = `  the hello  world   !

`
console.log(str.match(/\s/g)); // (14) ["↵", "↵", "↵", "↵", " ", " ", " ", " ", " ", " ", " ", " ", "↵", "↵"]
console.log(h.match(/\s/g)); // (10) [" ", " ", " ", " ", " ", " ", " ", " ", "↵", "↵"]
console.log(h.replace(/\s/g, '')); // thehelloworld!

// (?=) | 앞쪽 일치 (Lookahead)
console.log(str.match(/.{1,}(?=@)/g)); // ["thesecon"]

// (?<=) | 뒤쪽 일치 (Lookbehind)
console.log(str.match(/(?<=@).{1,}/g)); // ["gmail.com"]
