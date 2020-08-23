// jshint esversion: 9

// we as a developer set up as a global value which you just hardcode into your code, it's also quite common to use all uppercase characters there and separate words with an underscore, to make it really clear that this is a global value which you just hardcoded into the code as we did it here.
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = "ATTACK"; // MODE_ATTACK = 0
const MODE_STRONG_ATTACK = "STRONG_ATTACK"; // MODE_STRONG_ATTACK = 1

const enteredNumber = prompt("maximum life for you and the monster.", "100");
let chosenMaxLife = parseInt(enteredNumber);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert("you would be dead but the bonus life saved you");
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("you won");
    reset();
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("you lost");
    reset();
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("you have a draw.");
    reset();
  }

  // yukaridaki reset satirlarinin yerine altaki if statement da olur
  // if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
  //   reset();
  // }
}

function attackMonster(mode) {
  let maxDamage;
  if (mode === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
  } else if (mode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  endRound();
}

function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("you can not heal to more than your max initial health");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  endRound();
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
