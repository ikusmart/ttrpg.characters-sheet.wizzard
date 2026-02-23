import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { rollDice, type RollResult } from '@/lib/vtmDiceRoller';

interface DiceRollerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function getDieColor(value: number, isHunger: boolean): string {
  if (value === 10) return 'bg-purple-500 text-white border-purple-300';
  if (value >= 6) return 'bg-green-600 text-white border-green-400';
  if (isHunger && value === 1) return 'bg-red-700 text-white border-red-400';
  if (isHunger) return 'bg-red-900/60 text-red-200 border-red-700';
  return 'bg-muted text-muted-foreground border-border';
}

function DieCircle({ value, isHunger }: { value: number; isHunger: boolean }) {
  const colorClass = getDieColor(value, isHunger);
  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 ${colorClass}`}
    >
      {value}
    </div>
  );
}

function ResultSummary({ result }: { result: RollResult }) {
  const isSuccess = result.totalSuccesses > 0;
  const isCrit = result.critPairs > 0 && !result.messyCrit;

  return (
    <div className="space-y-2">
      <div className="text-center">
        <span className="text-2xl font-bold text-foreground">
          {result.totalSuccesses}
        </span>
        <span className="text-muted-foreground ml-2">
          {result.totalSuccesses === 1 ? 'успех (success)' : 'успехов (successes)'}
        </span>
      </div>

      {result.critPairs > 0 && (
        <p className="text-xs text-muted-foreground text-center">
          +{result.critPairs * 2} от критических пар ({result.critPairs} × критическая пара / critical pair)
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-2">
        {result.bestialFailure && (
          <span className="px-3 py-1 rounded-full bg-red-900 text-red-100 text-sm font-semibold">
            Звериная неудача! (Bestial Failure)
          </span>
        )}
        {result.messyCrit && (
          <span className="px-3 py-1 rounded-full bg-purple-900 text-purple-100 text-sm font-semibold border border-red-500">
            Грязный критический! (Messy Critical)
          </span>
        )}
        {isCrit && (
          <span className="px-3 py-1 rounded-full bg-yellow-800 text-yellow-100 text-sm font-semibold">
            Критический успех! (Critical Success)
          </span>
        )}
        {!isSuccess && !result.bestialFailure && (
          <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm">
            Неудача (Failure)
          </span>
        )}
      </div>
    </div>
  );
}

export function DiceRollerDialog({ open, onOpenChange }: DiceRollerDialogProps) {
  const [poolSize, setPoolSize] = useState(5);
  const [hungerDice, setHungerDice] = useState(1);
  const [result, setResult] = useState<RollResult | null>(null);

  const handleRoll = () => {
    setResult(rollDice(poolSize, hungerDice));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Бросок дайсов (Dice Roll)</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Pool size input */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium w-44 shrink-0">
              Пул дайсов (Dice Pool)
            </label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => setPoolSize(p => Math.max(1, p - 1))}
              >
                −
              </Button>
              <span className="text-lg font-bold w-8 text-center">{poolSize}</span>
              <Button
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => setPoolSize(p => Math.min(30, p + 1))}
              >
                +
              </Button>
            </div>
          </div>

          {/* Hunger dice input */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium w-44 shrink-0">
              Дайсы Голода (Hunger Dice)
            </label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => setHungerDice(h => Math.max(0, h - 1))}
              >
                −
              </Button>
              <span className="text-lg font-bold w-8 text-center">{hungerDice}</span>
              <Button
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => setHungerDice(h => Math.min(5, h + 1))}
              >
                +
              </Button>
            </div>
          </div>

          {/* Roll button */}
          <Button
            className="w-full bg-purple-700 hover:bg-purple-600 text-white font-semibold"
            onClick={handleRoll}
          >
            Бросок (Roll)
          </Button>

          {/* Results */}
          {result !== null && (
            <div className="space-y-3 pt-2 border-t border-border">
              {/* Die display */}
              <div className="space-y-2">
                {result.normalDice.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Обычные дайсы (Normal Dice)
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {result.normalDice.map((v, i) => (
                        <DieCircle key={i} value={v} isHunger={false} />
                      ))}
                    </div>
                  </div>
                )}

                {result.hungerDice.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Дайсы Голода (Hunger Dice)
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {result.hungerDice.map((v, i) => (
                        <DieCircle key={i} value={v} isHunger={true} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-green-600 inline-block" /> успех
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-purple-500 inline-block" /> крит (10)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-red-700 inline-block" /> голод (1)
                </span>
              </div>

              {/* Summary */}
              <ResultSummary result={result} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
