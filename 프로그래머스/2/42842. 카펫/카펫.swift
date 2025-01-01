// yellow가 나뉘어지는 두 개의 수의 합 * 2 + 4 = brown

import Foundation

func solution(_ brown:Int, _ yellow:Int) -> [Int] {
    if yellow == 1 {
        return [3,3]
    }
    
    
    for i in 1...Int(sqrt(Double(yellow))) {
        if yellow % i == 0 {
            if (i + (yellow / i)) * 2 + 4 == brown {
                return [yellow / i + 2, i + 2]    
            }
        }
    }
    
    
    return []
}