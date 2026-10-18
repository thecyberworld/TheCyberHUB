import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ChoiceChips from '../ChoiceChips'

const options = [{ slug: 'web', label: 'Web' }, { slug: 'crypto', label: 'Crypto' }, { slug: 'pwn', label: 'Pwn' }]

describe('ChoiceChips', () => {
    it('adds and removes picks as checkboxes', () => {
        const onChange = vi.fn()
        render(<ChoiceChips label="Interests" options={options} selected={['web']} max={2} onChange={onChange} />)
        expect(screen.getByRole('checkbox', { name: 'Web' })).toHaveAttribute('aria-checked', 'true')
        fireEvent.click(screen.getByRole('checkbox', { name: 'Crypto' }))
        expect(onChange).toHaveBeenLastCalledWith(['web', 'crypto'])
        fireEvent.click(screen.getByRole('checkbox', { name: 'Web' }))
        expect(onChange).toHaveBeenLastCalledWith([])
    })

    it('stops at the limit but still lets a pick be removed', () => {
        const onChange = vi.fn()
        render(<ChoiceChips label="Interests" options={options} selected={['web', 'crypto']} max={2} onChange={onChange} />)
        const pwn = screen.getByRole('checkbox', { name: 'Pwn' })
        expect(pwn).toHaveAttribute('aria-disabled', 'true')
        fireEvent.click(pwn)
        expect(onChange).not.toHaveBeenCalled()
        fireEvent.click(screen.getByRole('checkbox', { name: 'Crypto' }))
        expect(onChange).toHaveBeenLastCalledWith(['web'])
    })

    it('is a radio group when only one can be chosen', () => {
        const onChange = vi.fn()
        render(<ChoiceChips label="Level" options={options} selected={['web']} max={1} onChange={onChange} />)
        expect(screen.getByRole('radiogroup', { name: 'Level' })).toBeInTheDocument()
        fireEvent.click(screen.getByRole('radio', { name: 'Crypto' }))
        expect(onChange).toHaveBeenLastCalledWith(['crypto'])
        fireEvent.click(screen.getByRole('radio', { name: 'Web' }))
        expect(onChange).toHaveBeenLastCalledWith([])
    })
})
