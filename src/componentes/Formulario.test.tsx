import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { RecoilRoot } from "recoil";
import Formulario from "./Formulario";

describe('o comportamento do Formulario.tsx', () => {
  test('quando o input esta vazio,  novos participantes nao podem ser adicionados', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>)
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')

    const botao = screen.getByRole('button')

    expect(input).toBeInTheDocument()

    expect(botao).toBeDisabled()
  })

  test('adicionar um participante caso exista um nome preenchido', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>)

    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')

    const botao = screen.getByRole('button')

    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    })

    fireEvent.click(botao)

    expect(input).toHaveFocus()

    expect(input).toHaveValue("")
  })

  test('nomes duplicados nao podem ser adicionados na lista', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>)
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getByRole('button')
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    })
    fireEvent.click(botao)
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    })
    fireEvent.click(botao)

    const mensagemDeErro = screen.getByRole('alert')

    expect(mensagemDeErro.textContent).toBe('Nomes duplicados nao sao permitidos!')
  })

  test('a mensagem de erro deve sumir apos os timers', () => {
    jest.useFakeTimers()
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>)
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getByRole('button')
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    })
    fireEvent.click(botao)
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    })
    fireEvent.click(botao)
    let mensagemDeErro = screen.queryByRole('alert')
    expect(mensagemDeErro).toBeInTheDocument()

    act(() => {
      jest.runAllTimers()
    });


    mensagemDeErro = screen.queryByRole('alert')
    expect(mensagemDeErro).toBeNull()
  })

})
