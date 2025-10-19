import { useState } from "react";
import { CardEditor } from "@/components/CardEditor";
import { VirtueWall } from "@/components/VirtueWall";
import { VirtueCardData } from "@/components/VirtueCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, LayoutGrid } from "lucide-react";

const Index = () => {
  const [cards, setCards] = useState<VirtueCardData[]>([]);

  const handleSaveCard = (newCard: VirtueCardData) => {
    setCards([...cards, newCard]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="bg-gradient-hero py-8 px-4 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground">
              나만의 미덕 카드
            </h1>
          </div>
          <p className="text-center text-primary-foreground/90 text-lg">
            나와 친구의 좋은 점을 발견하고 아름다운 카드로 만들어보세요
          </p>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="create" className="gap-2">
              <Sparkles className="w-4 h-4" />
              카드 만들기
            </TabsTrigger>
            <TabsTrigger value="wall" className="gap-2">
              <LayoutGrid className="w-4 h-4" />
              미덕벽 보기
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="mt-6">
            <div className="max-w-2xl mx-auto">
              <CardEditor onSave={handleSaveCard} />
            </div>
          </TabsContent>

          <TabsContent value="wall" className="mt-6">
            <VirtueWall cards={cards} />
          </TabsContent>
        </Tabs>
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
