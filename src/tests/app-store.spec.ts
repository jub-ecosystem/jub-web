// Copyright 2026 MADTEC-2025-M-478 Project Team
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { describe, test, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAppStore } from '../stores/app';

describe('Jub UI - App Store', () => {
  
  // Create a fresh Pinia instance before each test
  // This prevents state from leaking between tests
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('should initialize with default state', () => {
    const store = useAppStore();
    
    // Replace 'isLoading' with whatever your actual state variables are
    expect(store.isLoading).toBe(false); 
  });

  test('should update state when action is called', () => {
    const store = useAppStore();
    store.setIsLoading(true); // Replace with your actual action
    expect(store.isLoading).toBe(true); // Replace with your actual state variable
    store.setIsLoading(false); // Replace with your actual action
    expect(store.isLoading).toBe(false); // Replace with your actual state variable
    
  });
});