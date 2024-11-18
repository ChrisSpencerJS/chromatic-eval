import { fn } from '@storybook/test';
import { Button } from './Button';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';



// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary = {
  args: {
    label: 'Button',
  },
};

export const Large = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small = {
  args: {
    size: 'small',
    label: 'Button',
  },
};

export const ButtonTest = {
  args: {
    label: 'Test',
    onClick: () => document.querySelector('button[data-testid=button]').innerHTML='Clicked',
  },  
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
 
    await sleep(5000); // waits for 5 seconds
    
    // 👇 Simulate interactions with the component
    await userEvent.click(canvas.getByTestId('button'));

 
    //👇 Assert
    await expect(canvas.getByTestId('button').innerHTML).toBe('Clicked');
    await expect(canvas.getByText('Clicked')).toBeInTheDocument();
  },
};

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))