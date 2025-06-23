"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toast } from "@/components/ui/toast"
import { Copy, RefreshCw } from "lucide-react"

export default function PasswordGenerator() {
  const [length, setLength] = useState([16])
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [password, setPassword] = useState("")
  const [showToast, setShowToast] = useState(false)

  const generatePassword = () => {
    let chars = ""
    if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeLowercase) chars += "abcdefghijklmnopqrstuvwxyz"
    if (includeNumbers) chars += "0123456789"
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    if (chars === "") {
      setPassword("请选择至少一种字符类型")
      return
    }

    let result = ""
    for (let i = 0; i < length[0]; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(result)
  }

  const copyPassword = async () => {
    if (password && password !== "请选择至少一种字符类型") {
      await navigator.clipboard.writeText(password)
      setShowToast(true)
    }
  }

  return (
    <>
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="w-5 h-5" />
          密码生成器
        </CardTitle>
        <CardDescription>
          生成安全的随机密码
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 密码长度设置 */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            密码长度: {length[0]} 个字符
          </Label>
          <Slider
            value={length}
            onValueChange={setLength}
            min={4}
            max={50}
            step={1}
            className="w-full"
          />
        </div>

        {/* 字符类型选择 */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">字符类型</Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
                             <Checkbox
                 id="uppercase"
                 checked={includeUppercase}
                 onCheckedChange={(checked) => setIncludeUppercase(checked === true)}
               />
              <Label htmlFor="uppercase" className="text-sm">
                大写字母 (A-Z)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
                             <Checkbox
                 id="lowercase"
                 checked={includeLowercase}
                 onCheckedChange={(checked) => setIncludeLowercase(checked === true)}
               />
              <Label htmlFor="lowercase" className="text-sm">
                小写字母 (a-z)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
                             <Checkbox
                 id="numbers"
                 checked={includeNumbers}
                 onCheckedChange={(checked) => setIncludeNumbers(checked === true)}
               />
              <Label htmlFor="numbers" className="text-sm">
                数字 (0-9)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
                             <Checkbox
                 id="symbols"
                 checked={includeSymbols}
                 onCheckedChange={(checked) => setIncludeSymbols(checked === true)}
               />
              <Label htmlFor="symbols" className="text-sm">
                特殊符号 (!@#$%...)
              </Label>
            </div>
          </div>
        </div>

        {/* 生成按钮 */}
        <Button 
          onClick={generatePassword} 
          className="w-full"
          size="lg"
        >
          生成密码
        </Button>

        {/* 密码显示和复制 */}
        {password && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">生成的密码</Label>
            <div className="flex gap-2">
              <Input
                value={password}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                onClick={copyPassword}
                variant="outline"
                size="icon"
                disabled={password === "请选择至少一种字符类型"}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>

          </div>
                  )}
        </CardContent>
      </Card>
      
      <Toast
        message="密码已复制到剪贴板"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        duration={3000}
      />
    </>
  )
} 