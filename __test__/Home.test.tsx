import Home from '@/app/page'
import { render, screen } from '@testing-library/react'

describe('Home', () => {
    it('should have TableList text', () => {
        render(<Home />) // ARRANGE 

        const myElem = screen.getByText('TableList example 1') // ACT 

        expect(myElem).toBeInTheDocument() // ASSERT
    })
})