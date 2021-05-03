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

// 1. 자바스크립트 정규식 생성과 플래그 (옵션)

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

// 2. 자바스크립트 메소드

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
