import Personagem from './Personagem.js';

export default class Guerreiro extends Personagem {
  #defesaAdicional = 0;

  constructor(nome, vida = 120, mana = 30, forca = 15, defesa = 10) {
    super(nome, vida, mana, forca, defesa);
  }

  get defesa() {
    return super.defesa + this.#defesaAdicional;
  }

  atacar(alvo) {
    if (!this.estaVivo()) {
      console.log(`${this.nome} não pode atacar pois está derrotado!`);
      return;
    }
    if (!alvo || !alvo.estaVivo()) {
      console.log(`Alvo inválido ou já derrotado!`);
      return;
    }

    console.log(`⚔️ Guerreiro ${this.nome} ataca ${alvo.nome}!`);
    alvo.receberDano(this.forca);
  }

  usarHabilidadeEspecial(alvo) {
    if (!this.estaVivo()) {
      console.log(`${this.nome} não pode usar habilidade especial pois está derrotado!`);
      return;
    }

    const custoMana = 10;
    if (this.usarMana(custoMana)) {
      const incrementoDefesa = 5;
      this.#defesaAdicional += incrementoDefesa;
      console.log(`🛡️ Guerreiro ${this.nome} usou Postura Defensiva (+${incrementoDefesa} de defesa! Defesa total: ${this.defesa})`);
    }
  }
}
