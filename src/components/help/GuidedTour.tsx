import { useEffect, useRef } from 'react';
import { driver, type DriveStep } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useHelp } from './HelpProvider';
import { dndTourSteps } from '@/data/help/dnd/tourSteps';
import { vtmTourSteps } from '@/data/help/vtm/tourSteps';
import type { TourStep } from '@/models/help';

function toDriverSteps(steps: TourStep[]): DriveStep[] {
  return steps.map((step) => ({
    element: `[data-tour="${step.target}"]`,
    popover: {
      title: step.title,
      description: step.content,
      side: step.placement as 'top' | 'bottom' | 'left' | 'right',
    },
  }));
}

export function GuidedTour() {
  const { isTourRunning, stopTour, tourGameSystem } = useHelp();
  const driverRef = useRef<ReturnType<typeof driver> | null>(null);

  useEffect(() => {
    if (!isTourRunning || !tourGameSystem) return;

    const steps = tourGameSystem === 'dnd' ? dndTourSteps : vtmTourSteps;

    const driverObj = driver({
      showProgress: true,
      animate: true,
      allowClose: true,
      overlayClickBehavior: 'close',
      stagePadding: 8,
      stageRadius: 8,
      popoverClass: 'help-tour-popover',
      nextBtnText: 'Далее',
      prevBtnText: 'Назад',
      doneBtnText: 'Готово',
      progressText: '{{current}} из {{total}}',
      steps: toDriverSteps(steps),
      onDestroyStarted: () => {
        driverObj.destroy();
        stopTour();
      },
    });

    driverRef.current = driverObj;
    driverObj.drive();

    return () => {
      driverObj.destroy();
    };
  }, [isTourRunning, tourGameSystem, stopTour]);

  return null;
}
