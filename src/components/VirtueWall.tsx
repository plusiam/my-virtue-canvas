import { VirtueCard, VirtueCardData } from "./VirtueCard";
import { Card } from "@/components/ui/card";
import { Heart, Users } from "lucide-react";

interface VirtueWallProps {
  cards: VirtueCardData[];
}

export const VirtueWall = ({ cards }: VirtueWallProps) => {
  if (cards.length === 0) {
    return (
      <Card className="p-12 text-center bg-gradient-virtue">
        <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          미덕벽이 비어있어요
        </h3>
        <p className="text-muted-foreground">
          첫 번째 미덕 카드를 만들어보세요!
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-primary" />
        <h2 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          우리반 미덕벽
        </h2>
        <span className="text-muted-foreground">({cards.length}개의 미덕)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <VirtueCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
};
