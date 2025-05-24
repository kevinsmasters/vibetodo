export type Todo = {
  id: number;
  text: string;
  completed?: boolean;
};


export type Action =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'TOGGLE_ALL' };


 export function todoReducer(state: Todo[], action: Action): Todo[] {
    switch (action.type) {
      case 'ADD_TODO':
        return [
          ...state,
          { id: Date.now(), text: action.payload, completed: false }
        ];
      case 'TOGGLE_TODO':
        return state.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        );
      case 'DELETE_TODO':
        return state.filter(todo => todo.id !== action.payload);
      case 'TOGGLE_ALL': {
        const allCompleted = state.every(todo => todo.completed);
        return state.map(todo => ({ ...todo, completed: !allCompleted }));
      }
      default:
        return state;
    }
  }
