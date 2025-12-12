export interface ChemistryQuestion {
  id: number;
  text: string;
  topic: string;
}

export const chemistryQuestions: ChemistryQuestion[] = [
  {
    id: 1,
    text: "How many moles of phosphate ions, PO₄³⁻, are there in 103.39 g of Ca₃(PO₄)₂? Mr = 310.18\nA. 0.11\nB. 0.33\nC. 0.67\nD. 2.00",
    topic: "Stoichiometry"
  },
  {
    id: 2,
    text: "What is the sum of the coefficients for the balanced equation of the combustion of iron(II) sulphide using the smallest whole numbers?\n_FeS (s) + _O₂ (g) → _Fe₂O₃ (s) + _SO₂ (g)\nA. 6\nB. 7\nC. 14\nD. 17",
    topic: "Chemical Equations"
  },
  {
    id: 3,
    text: "What is the yield of sodium chloride, in grams, when 4.60 g of sodium reacts with 1.14 dm³ of chlorine gas at STP?\nMolar volume = 22.7 dm³ mol⁻¹\n2Na (s) + Cl₂ (g) → 2NaCl (s)\nA. 1.17\nB. 2.92\nC. 5.84\nD. 11.7",
    topic: "Stoichiometry"
  },
  {
    id: 4,
    text: "Which of these period 3 oxides forms a solution with pH < 7 when added to water?\nA. Al₂O₃\nB. MgO\nC. Na₂O\nD. P₄O₆",
    topic: "Periodicity"
  },
  {
    id: 5,
    text: "Which configuration is that of a transition metal atom in its ground state?\nA. [Ne]3s²3p⁶\nB. [Ar]3d⁹\nC. 1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p²\nD. [Ar]4s¹3d⁵",
    topic: "Atomic Structure"
  },
  {
    id: 6,
    text: "[Co(H₂O)₆]³⁺ is blue while [Co(CN)₆]³⁻ is pale yellow. Which statement correctly explains the difference in colour?\nA. The ligand in [Co(CN)₆]³⁻ is weaker and absorbs light of higher frequency.\nB. The oxidation state of cobalt is different in each complex.\nC. The different colours are due to the different charges on the complex.\nD. The ligand in [Co(CN)₆]³⁻ causes larger 3d orbital splitting and absorbs light of higher frequency.",
    topic: "Transition Metals"
  },
  {
    id: 7,
    text: "What is correct for the wavelength and energy of the radiation of the ultraviolet and visible regions of the electromagnetic spectrum?\n\nA. UV: Lower wavelength and higher energy | Visible: Higher wavelength and lower energy\nB. UV: Lower wavelength and lower energy | Visible: Higher wavelength and higher energy\nC. UV: Higher wavelength and lower energy | Visible: Lower wavelength and higher energy\nD. UV: Higher wavelength and higher energy | Visible: Lower wavelength and lower energy",
    topic: "Spectroscopy"
  },
  {
    id: 8,
    text: "Which types of intermolecular force exist between CH₄ molecules?\nA. London dispersion only\nB. London dispersion and H-bonding\nC. London dispersion and dipole-dipole\nD. London dispersion, H-bonding, and dipole-dipole",
    topic: "Bonding"
  },
  {
    id: 9,
    text: "What is the Ar of an element as determined from its mass spectrum showing isotopes at mass 10 (80.1%) and mass 11 (19.9%)?\nA. 10.0\nB. 10.2\nC. 10.5\nD. 10.8",
    topic: "Atomic Structure"
  },
  {
    id: 10,
    text: "The graph represents the first ten ionization energies (IE) of an element. Based on the pattern showing a significant jump after 7 electrons are removed, what is the element?\nA. Cl\nB. Ne\nC. O\nD. S",
    topic: "Periodicity"
  }
];
