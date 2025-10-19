import { useState } from "react";
import { VirtueCard, VirtueCardData } from "@/components/VirtueCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Palette, Sparkles, Download, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const VIRTUE_OPTIONS = [
  "용기", "친절", "책임", "정직", "존중", "배려",
  "공감", "인내", "감사", "협력", "창의", "성실"
];

const COLOR_OPTIONS = [
  { name: "따뜻한 복숭아", value: "#FFE5D9" },
  { name: "부드러운 라벤더", value: "#E8D7FF" },
  { name: "신선한 민트", value: "#D4F1E8" },
  { name: "상쾌한 하늘", value: "#D4E9FF" },
  { name: "활기찬 코랄", value: "#FFD4D4" },
  { name: "밝은 레몬", value: "#FFF4D4" },
];

const PATTERN_OPTIONS = [
  { name: "없음", value: "none" },
  { name: "점무늬", value: "radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)" },
  { name: "줄무늬", value: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.03) 10px, rgba(0,0,0,0.03) 20px)" },
  { name: "별빛", value: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)" },
];

const Index = () => {
  const [grade, setGrade] = useState("");
  const [className, setClassName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [frontVirtue, setFrontVirtue] = useState("");
  const [frontAction, setFrontAction] = useState("");
  const [backVirtue, setBackVirtue] = useState("");
  const [backThanks, setBackThanks] = useState("");
  const [backgroundColor, setBackgroundColor] = useState(COLOR_OPTIONS[0].value);
  const [pattern, setPattern] = useState(PATTERN_OPTIONS[0].value);

  const handleReset = () => {
    if (window.confirm("작성한 내용을 모두 지우고 새로 시작할까요?")) {
      setFrontVirtue("");
      setFrontAction("");
      setBackVirtue("");
      setBackThanks("");
      setBackgroundColor(COLOR_OPTIONS[0].value);
      setPattern(PATTERN_OPTIONS[0].value);
    }
  };

  const cardData: VirtueCardData = {
    id: "preview",
    grade,
    className,
    studentName,
    frontVirtue,
    frontAction,
    backVirtue,
    backThanks,
    backgroundColor,
    pattern,
  };

  const isComplete = grade && className && studentName && frontVirtue && frontAction;

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="bg-gradient-hero py-6 px-4 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sparkles className="w-7 h-7 text-primary-foreground" />
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              나만의 미덕 카드
            </h1>
          </div>
          <p className="text-center text-primary-foreground/90">
            나와 친구의 좋은 점을 발견하고 아름다운 카드로 만들어보세요
          </p>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 입력 폼 */}
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-card shadow-card">
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    카드 만들기
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    새로 만들기
                  </Button>
                </div>

                {/* 학생 정보 */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="grade">학년</Label>
                    <Input
                      id="grade"
                      placeholder="3학년"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="class">반</Label>
                    <Input
                      id="class"
                      placeholder="1반"
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="studentName">이름</Label>
                    <Input
                      id="studentName"
                      placeholder="홍길동"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                    />
                  </div>
                </div>

                {/* 앞면 정보 */}
                <div className="space-y-4 p-4 bg-gradient-virtue rounded-lg">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Badge variant="default">앞면</Badge>
                    나의 미덕
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="frontVirtue">미덕 선택</Label>
                    <Select value={frontVirtue} onValueChange={setFrontVirtue}>
                      <SelectTrigger id="frontVirtue">
                        <SelectValue placeholder="미덕을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {VIRTUE_OPTIONS.map((virtue) => (
                          <SelectItem key={virtue} value={virtue}>
                            {virtue}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="frontAction">실천한 행동</Label>
                    <Textarea
                      id="frontAction"
                      placeholder="이 미덕으로 실천한 구체적인 행동을 적어보세요. 예: 친구에게 먼저 사과할 수 있는 용기를 냈어요."
                      value={frontAction}
                      onChange={(e) => setFrontAction(e.target.value)}
                      rows={3}
                      className="resize-none"
                    />
                  </div>
                </div>

                {/* 뒷면 정보 */}
                <div className="space-y-4 p-4 bg-gradient-virtue rounded-lg">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Badge variant="secondary">뒷면</Badge>
                    친구가 발견한 미덕
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="backVirtue">친구의 칭찬</Label>
                    <Textarea
                      id="backVirtue"
                      placeholder='친구가 발견해준 미덕을 적어보세요. 예: "친구가 내 말을 잘 들어줘서 공감의 미덕이 있다고 했어요."'
                      value={backVirtue}
                      onChange={(e) => setBackVirtue(e.target.value)}
                      rows={2}
                      className="resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backThanks">감사의 말</Label>
                    <Textarea
                      id="backThanks"
                      placeholder='칭찬해준 친구에게 전하고 싶은 감사의 말을 적어보세요. 예: "내 안의 좋은 점을 찾아줘서 고마워."'
                      value={backThanks}
                      onChange={(e) => setBackThanks(e.target.value)}
                      rows={2}
                      className="resize-none"
                    />
                  </div>
                </div>

                {/* 디자인 옵션 */}
                <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    카드 꾸미기
                  </h3>

                  <div className="space-y-2">
                    <Label>배경 색상</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {COLOR_OPTIONS.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => setBackgroundColor(color.value)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            backgroundColor === color.value
                              ? "border-primary shadow-md"
                              : "border-border hover:border-primary/50"
                          }`}
                          style={{ backgroundColor: color.value }}
                        >
                          <span className="text-xs font-medium text-foreground/80">
                            {color.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pattern">패턴 선택</Label>
                    <Select value={pattern} onValueChange={setPattern}>
                      <SelectTrigger id="pattern">
                        <SelectValue placeholder="패턴을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {PATTERN_OPTIONS.map((p) => (
                          <SelectItem key={p.value} value={p.value}>
                            {p.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* 오른쪽: 미리보기 & 다운로드 */}
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-card shadow-card">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground text-center">
                  카드 미리보기
                </h2>

                {!isComplete && (
                  <Alert>
                    <AlertDescription>
                      왼쪽 폼을 채우면 여기에 카드가 나타나요!
                      <br />
                      <strong>필수 입력:</strong> 학년, 반, 이름, 미덕, 실천한 행동
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex justify-center">
                  <VirtueCard {...cardData} />
                </div>

                {isComplete && (
                  <div className="space-y-3 p-4 bg-success/10 rounded-lg border-2 border-success/30">
                    <div className="flex items-center gap-2 text-success-foreground">
                      <Download className="w-5 h-5" />
                      <h3 className="font-semibold">완성했어요! 🎉</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      카드 아래의 <strong>"다운로드"</strong> 버튼을 눌러 저장하세요.
                      <br />
                      저장한 이미지를 클래스팅이나 패들렛에 올려보세요!
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="mt-16 py-6 border-t border-border">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground text-sm">
            서로의 미덕을 발견하고 칭찬하며 함께 성장해요 💝
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
