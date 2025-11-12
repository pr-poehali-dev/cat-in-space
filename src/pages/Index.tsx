import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Planet = {
  id: number;
  name: string;
  color: string;
  position: { x: number; y: number };
  riddle: string;
  answer: string;
  completed: boolean;
  emoji: string;
};

const Index = () => {
  const [planets, setPlanets] = useState<Planet[]>([
    {
      id: 1,
      name: 'Планета Загадок',
      color: 'bg-secondary',
      position: { x: 20, y: 30 },
      riddle: 'Что можно увидеть с закрытыми глазами?',
      answer: 'сон',
      completed: false,
      emoji: '🌙'
    },
    {
      id: 2,
      name: 'Планета Тайн',
      color: 'bg-primary',
      position: { x: 70, y: 20 },
      riddle: 'Без крыльев летят, без ног бегут, без паруса плывут.',
      answer: 'облака',
      completed: false,
      emoji: '☁️'
    },
    {
      id: 3,
      name: 'Планета Чудес',
      color: 'bg-accent',
      position: { x: 45, y: 60 },
      riddle: 'Не огонь, а жжётся. Что это?',
      answer: 'крапива',
      completed: false,
      emoji: '🌿'
    },
    {
      id: 4,
      name: 'Планета Открытий',
      color: 'bg-destructive',
      position: { x: 15, y: 70 },
      riddle: 'Всегда во рту, а не проглотишь.',
      answer: 'язык',
      completed: false,
      emoji: '👅'
    }
  ]);

  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [catPosition, setCatPosition] = useState({ x: 50, y: 50 });

  const completedCount = planets.filter(p => p.completed).length;
  const allCompleted = completedCount === planets.length;

  const handlePlanetClick = (planet: Planet) => {
    if (planet.completed) return;
    setSelectedPlanet(planet);
    setUserAnswer('');
    setMessage('');
    setCatPosition({ x: planet.position.x, y: planet.position.y });
  };

  const handleSubmitAnswer = () => {
    if (!selectedPlanet) return;

    const isCorrect = userAnswer.toLowerCase().trim() === selectedPlanet.answer.toLowerCase();

    if (isCorrect) {
      setPlanets(planets.map(p =>
        p.id === selectedPlanet.id ? { ...p, completed: true } : p
      ));
      setMessage('Правильно! 🎉');
      setTimeout(() => {
        setSelectedPlanet(null);
        setMessage('');
      }, 2000);
    } else {
      setMessage('Попробуй ещё раз! 🤔');
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-accent animate-twinkle"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 2 + 's'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto p-4 h-screen flex flex-col">
        <div className="flex items-center justify-between mb-6 pt-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
              <span className="text-5xl">🐱</span>
              <span>Космический Кот</span>
            </h1>
            <p className="text-muted-foreground font-playful text-xl">
              Помоги коту разгадать тайны планет!
            </p>
          </div>
          <Card className="p-4 bg-card/80 backdrop-blur">
            <div className="flex items-center gap-2">
              <Icon name="Star" className="text-accent" size={24} />
              <div>
                <p className="text-sm text-muted-foreground">Исследовано</p>
                <p className="text-2xl font-bold text-foreground">
                  {completedCount} / {planets.length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {allCompleted && (
          <Card className="mb-6 p-6 bg-primary/20 border-primary animate-bounce-in">
            <div className="flex items-center gap-4">
              <span className="text-6xl">🏆</span>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">
                  Поздравляем!
                </h2>
                <p className="text-lg text-foreground font-playful">
                  Кот исследовал все планеты! Ты настоящий космический герой!
                </p>
              </div>
            </div>
          </Card>
        )}

        <div className="flex-1 relative">
          <div
            className="absolute transition-all duration-1000 ease-in-out animate-float"
            style={{
              left: `${catPosition.x}%`,
              top: `${catPosition.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 20
            }}
          >
            <div className="text-6xl filter drop-shadow-lg">
              🚀
            </div>
          </div>

          {planets.map((planet) => (
            <button
              key={planet.id}
              onClick={() => handlePlanetClick(planet)}
              disabled={planet.completed}
              className={`absolute transition-all duration-300 ${
                planet.completed ? 'opacity-50' : 'hover:scale-110 cursor-pointer'
              }`}
              style={{
                left: `${planet.position.x}%`,
                top: `${planet.position.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="relative">
                <div
                  className={`w-20 h-20 rounded-full ${planet.color} flex items-center justify-center text-3xl shadow-lg ${
                    planet.completed ? '' : 'animate-pulse-glow'
                  }`}
                >
                  {planet.emoji}
                </div>
                {planet.completed && (
                  <div className="absolute -top-2 -right-2 animate-bounce-in">
                    <Icon name="Check" className="text-green-400 bg-green-950 rounded-full p-1" size={24} />
                  </div>
                )}
                <p className="text-xs text-foreground mt-2 font-medium text-center max-w-[100px]">
                  {planet.name}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={selectedPlanet !== null} onOpenChange={() => setSelectedPlanet(null)}>
        <DialogContent className="sm:max-w-md bg-card">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-3">
              <span className="text-4xl">{selectedPlanet?.emoji}</span>
              {selectedPlanet?.name}
            </DialogTitle>
            <DialogDescription className="text-base pt-4">
              <span className="font-playful text-lg text-foreground">
                Разгадай загадку этой планеты:
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <Card className="p-4 bg-muted">
              <p className="text-lg text-foreground font-medium">
                {selectedPlanet?.riddle}
              </p>
            </Card>
            <div className="space-y-3">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmitAnswer()}
                placeholder="Твой ответ..."
                className="w-full px-4 py-3 rounded-lg bg-background border-2 border-border focus:border-primary focus:outline-none text-foreground"
                autoFocus
              />
              {message && (
                <Badge
                  variant={message.includes('Правильно') ? 'default' : 'secondary'}
                  className="w-full justify-center py-2 text-base"
                >
                  {message}
                </Badge>
              )}
            </div>
            <Button
              onClick={handleSubmitAnswer}
              className="w-full text-lg py-6"
              size="lg"
            >
              Проверить ответ
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
