import React, { useState, useEffect } from 'react';
import {
  Provider,
  defaultTheme,
  Button,
  Flex,
  Form,
  TextField,
  Header,
  Heading,
  Content,
  Text,
  View,
  Well
} from '@adobe/react-spectrum';

const RomanNumeralConverter: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [romanNumeral, setRomanNumeral] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setColorScheme(e.matches ? 'dark' : 'light');
    };
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    
    return undefined;
  }, []);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setError('');
    setRomanNumeral('');
  };

  const handleConvert = async () => {
    setError('');
    setRomanNumeral('');
    setIsLoading(true);
    
    try {
      const response = await fetch(`http://localhost:8080/romannumeral?query=${inputValue}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to convert number');
      }
      
      const data = await response.json();
      setRomanNumeral(data.output);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Provider theme={defaultTheme} colorScheme={colorScheme}>
      <View width="100%" height="100vh" padding="size-300">
        <Flex 
          direction="column" 
          alignItems="center" 
          justifyContent="center" 
          width="100%" 
          height="100%"
        >
          <View 
            width="100%" 
            maxWidth="size-6000" 
            backgroundColor="gray-50" 
            borderRadius="medium" 
            padding="size-400"
            UNSAFE_style={{
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Header>
              <Heading level={1}>Roman numeral converter</Heading>
            </Header>
            <Content>
              <Form width="100%">
                <TextField
                  label="Enter a number"
                  type="number"
                  value={inputValue}
                  onChange={handleInputChange}
                  width="100%"
                  validationState={inputValue ? 
                    (Number(inputValue) >= 1 && Number(inputValue) <= 3999 ? 'valid' : 'invalid') : 
                    undefined}
                  isRequired
                  description="Enter a whole number between 1 and 3999"
                  errorMessage="Number must be between 1 and 3999"
                />
                <Button
                  variant="cta"
                  onPress={handleConvert}
                  isDisabled={!inputValue || isLoading || Number(inputValue) < 1 || Number(inputValue) > 3999}
                  marginTop="size-200"
                  width="100%"
                >
                  Convert to roman numeral
                </Button>
              </Form>

              {isLoading && (
                <View marginTop="size-300">
                  <Text>Converting...</Text>
                </View>
              )}

              {error && (
                <View marginTop="size-300">
                  <Text UNSAFE_style={{ color: 'var(--spectrum-global-color-red-500)' }}>{error}</Text>
                </View>
              )}

              {romanNumeral && (
                <View marginTop="size-400">
                  <Text>Roman numeral:</Text>
                  <Well marginTop="size-100" UNSAFE_style={{ textAlign: 'center' }}>
                    <Heading level={2} UNSAFE_style={{ 
                      fontFamily: "serif", 
                      fontSize: "2.5rem", 
                      letterSpacing: "0.1em",
                      margin: "16px 0"
                    }}>
                      {romanNumeral}
                    </Heading>
                  </Well>
                </View>
              )}
            </Content>
          </View>
        </Flex>
      </View>
    </Provider>
  );
};

export default RomanNumeralConverter;