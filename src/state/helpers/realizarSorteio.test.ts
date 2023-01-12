import { realizarSorteio } from "./realizarSorteio"

describe('dado um sorteio de amigo secreto', () => {
  test('cada participante nao soteie o proprio nome', () => {

    const participantes = [
      'Ana',
      'Catarina',
      'Juliana',
      'João',
      'Vinicios',
      'Nathalia'
    ]

    const sorteio = realizarSorteio(participantes)
    participantes.forEach(participante => {
      const amigoSecreto = sorteio.get(participante)
      expect(amigoSecreto).not.toEqual(participante)
    })

  })
})