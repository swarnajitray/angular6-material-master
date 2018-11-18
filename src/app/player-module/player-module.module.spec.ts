import { PlayerModuleModule } from './player-module.module';

describe('PlayerModuleModule', () => {
  let playerModuleModule: PlayerModuleModule;

  beforeEach(() => {
    playerModuleModule = new PlayerModuleModule();
  });

  it('should create an instance', () => {
    expect(playerModuleModule).toBeTruthy();
  });
});
