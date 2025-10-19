import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Download, RotateCcw, Sparkles } from "lucide-react";

interface VirtueCardProps {
  id: string;
  frontVirtue: string;
  frontAction: string;
  backVirtue: string;
  backThanks: string;
  backgroundColor: string;
  pattern: string;
  onUpdate?: (updates: Partial<VirtueCardData>) => void;
}

export interface VirtueCardData {
  id: string;
  frontVirtue: string;
  frontAction: string;
  backVirtue: string;
  backThanks: string;
  backgroundColor: string;
  pattern: string;
}

export const VirtueCard = ({
  frontVirtue,
  frontAction,
  backVirtue,
  backThanks,
  backgroundColor,
  pattern,
  onUpdate,
}: VirtueCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const cardStyle = {
    backgroundColor,
    backgroundImage: pattern !== "none" ? pattern : undefined,
  };

  const handleDownload = () => {
    // 카드 다운로드 기능 구현
    console.log("카드 다운로드");
  };

  return (
    <div className="relative w-full max-w-sm mx-auto perspective-1000">
      <div
        className={`relative w-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* 앞면 */}
        <Card
          className={`absolute w-full h-80 p-6 shadow-card hover:shadow-hover transition-all duration-300 backface-hidden ${
            isFlipped ? "invisible" : ""
          }`}
          style={cardStyle}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <Badge className="text-xl px-6 py-2 bg-primary text-primary-foreground">
              <Sparkles className="w-5 h-5 mr-2" />
              {frontVirtue || "나의 미덕"}
            </Badge>
            <div className="flex-1 flex items-center justify-center px-4">
              <p className="text-center text-foreground font-medium leading-relaxed">
                {frontAction || "미덕을 실천한 행동을 적어보세요"}
              </p>
            </div>
          </div>
        </Card>

        {/* 뒷면 */}
        <Card
          className={`absolute w-full h-80 p-6 shadow-card hover:shadow-hover transition-all duration-300 backface-hidden rotate-y-180 ${
            !isFlipped ? "invisible" : ""
          }`}
          style={cardStyle}
        >
          <div className="flex flex-col h-full space-y-4">
            <Badge className="text-lg px-4 py-2 bg-secondary text-secondary-foreground self-center">
              친구가 발견한 미덕
            </Badge>
            <div className="flex-1 space-y-3">
              <div className="bg-card/80 backdrop-blur-sm rounded-lg p-3">
                <p className="text-sm text-muted-foreground mb-1">미덕:</p>
                <p className="text-foreground font-medium">
                  {backVirtue || "친구의 칭찬을 기다려요"}
                </p>
              </div>
              <div className="bg-card/80 backdrop-blur-sm rounded-lg p-3">
                <p className="text-sm text-muted-foreground mb-1">감사의 말:</p>
                <p className="text-foreground">
                  {backThanks || "감사의 마음을 전해보세요"}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 컨트롤 버튼 */}
      <div className="flex justify-center gap-2 mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFlipped(!isFlipped)}
          className="gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          뒤집기
        </Button>
        <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2">
          <Download className="w-4 h-4" />
          저장
        </Button>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};
