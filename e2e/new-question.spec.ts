import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173');
});

const QUESTION_ITEMS = [
  'What are you doing',
  'Do you feed the cat?',
] as const;

test.describe('New question', () => {
  test('should allow me to add question items', async ({ page }) => {
    const textInput = page.getByPlaceholder(/Enter\syour\squestion\shere/);
    const button = page.getByRole('button', { name: 'Ask' });

    // Create 1st question.
    await textInput.fill(QUESTION_ITEMS[0]);
    await button.click();

    // Make sure the list only has one question item.
    await expect(page.getByTestId('question-title')).toHaveText([
      QUESTION_ITEMS[0]
    ]);

    // Create 2nd question.
    await textInput.fill(QUESTION_ITEMS[1]);
    await button.click();

    // Make sure the list now has two question items.
    await expect(page.getByTestId('question-title')).toHaveText([
      QUESTION_ITEMS[0],
      QUESTION_ITEMS[1]
    ]);
  });
});
