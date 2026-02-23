export interface SpeciesTrait {
  name: string;
  nameEn: string;
  description: string;
}

export interface Species {
  id: string;
  name: string;
  nameEn: string;
  size: 'Small' | 'Medium';
  speed: number;
  traits: SpeciesTrait[];
}
