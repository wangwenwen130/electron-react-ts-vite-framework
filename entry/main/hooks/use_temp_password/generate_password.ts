export const generatePassword = () => {
  const chars = {
    numbers: '0123456789'.split(''),
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    lower: 'abcdefghijklmnopqrstuvwxyz'.split(''),
    symbols: '@#$%&'.split(''),
  }

  const length = Math.floor(Math.random() * 3) + 6

  const types = ['numbers', 'upper', 'lower', 'symbols'] as const
  type CharType = (typeof types)[number] // 提取联合类型
  let selectedTypes: CharType[] = [] // 明确类型为联合类型数组

  const numTypes = Math.floor(Math.random() * 3) + 2
  while (selectedTypes.length < numTypes) {
    const type = types[Math.floor(Math.random() * types.length)]
    if (!selectedTypes.includes(type as CharType)) selectedTypes.push(type)
  }

  let password = []
  selectedTypes.forEach((type) => {
    password.push(chars[type][Math.floor(Math.random() * chars[type].length)])
  })

  while (password.length < length) {
    const type = selectedTypes[Math.floor(Math.random() * selectedTypes.length)]
    password.push(chars[type][Math.floor(Math.random() * chars[type].length)])
  }

  return password.sort(() => Math.random() - 0.5).join('')
}

export const validatePassword = (password: string): boolean => {
  // 验证密码长度是否在6-8位之间
  if (password.length < 6 || password.length > 8) return false;

  // 验证是否仅包含允许的字符（数字/大写字母/小写字母/符号）
  const validCharsRegex = /^[0-9A-Za-z@#$%&]+$/;
  if (!validCharsRegex.test(password)) return false;

  // 统计包含的字符类型数量
  const hasNumber = /[0-9]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasSymbol = /[!@#$%^&*]/.test(password); // 匹配@#$%&等符号

  const typeCount = 
    (hasNumber ? 1 : 0) + 
    (hasUpper ? 1 : 0) + 
    (hasLower ? 1 : 0) + 
    (hasSymbol ? 1 : 0);

  // 需要至少包含两种类型
  return typeCount >= 2;
};