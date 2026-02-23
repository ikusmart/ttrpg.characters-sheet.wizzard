import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { VtmCharacter } from '@/models/vtm/character';

interface VtmCharacterCardProps {
  character: VtmCharacter;
  isDemo?: boolean;
  onDelete?: (id: string) => void;
}

export function VtmCharacterCard({ character, isDemo, onDelete }: VtmCharacterCardProps) {
  const navigate = useNavigate();
  const route = isDemo ? '/vtm/sheet' : `/vtm/sheet/${character.id}`;

  return (
    <Card
      className="cursor-pointer hover:border-primary/50 transition-colors"
      onClick={() => navigate(route)}
    >
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className="font-semibold">{character.name}</p>
              {isDemo && <Badge variant="secondary">Демо</Badge>}
            </div>
            <p className="text-sm text-muted-foreground">
              {character.clanName} ({character.clanNameEn})
            </p>
            <p className="text-sm text-muted-foreground">
              {character.predatorTypeName} ({character.predatorTypeNameEn})
            </p>
          </div>
          {!isDemo && onDelete && (
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(character.id);
              }}
            >
              Удалить
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
