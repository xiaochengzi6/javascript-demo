for (var i = 0; i < 10; i++) {
  // 第一种
}

var arrs = [1, 2, 3, 4]
for (let i = 0, length = arrs.length; i < length; i++) {
  // 第二种
}

for (let i = 0, arr; (arr = arrs[i]); i++) {
  // 第三种
}

for (let i = arrs.length; i--; ) {
  // 第四种
  console.log(i, arrs[i])
}
